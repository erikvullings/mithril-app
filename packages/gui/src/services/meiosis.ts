import { meiosisSetup } from 'meiosis-setup';
import type { MeiosisCell, MeiosisConfig, Service } from 'meiosis-setup/types';
import m, { type FactoryComponent } from 'mithril';
import { routingSvc } from '.';
import { type DataModel, Pages, type Settings } from '../models';
import { type User, type UserRole } from './login-service';
import { scrollToTop } from '../utils';

export const EmptyDataModel = () =>
  ({
    version: 1,
    lastUpdate: Date.now(),
  } as DataModel);

// const settingsSvc = restServiceFactory<Settings>('settings');
const MODEL_KEY = 'MITHRIL_APP_MODEL';
const USER_ROLE = 'USER_ROLE';
export const APP_TITLE = 'incommand';
export const APP_TITLE_SHORT = 'incommand';

export interface State {
  page: Pages;
  model: DataModel;
  loggedInUser?: User;
  role: UserRole;
  settings: Settings;
  searchFilter: string;
  searchResults: any[];
}

export type MeiosisComponent<A = {}> = FactoryComponent<MeiosisCell<State> & A>;

export const actions = {
  // addDucks: (cell, amount) => {
  //   cell.update({ ducks: (value) => value + amount });
  // },
  setPage: (cell: MeiosisCell<State>, page: Pages, info?: string) => {
    document.title = `${APP_TITLE} | ${page.replace('_', ' ')}${info ? ` | ${info}` : ''}`;
    // const curPage = states().page;
    // if (curPage === page) return;
    cell.update({
      page: () => {
        scrollToTop();
        return page;
      },
    });
  },
  changePage: (
    cell: MeiosisCell<State>,
    page: Pages,
    params?: Record<string, string | number | undefined>,
    query?: Record<string, string | number | undefined>
  ) => {
    routingSvc && routingSvc.switchTo(page, params, query);
    document.title = `${APP_TITLE} | ${page.replace('_', ' ')}`;
    cell.update({ page });
  },
  saveModel: (cell: MeiosisCell<State>, model: DataModel) => {
    model.lastUpdate = Date.now();
    model.version = model.version ? model.version++ : 1;
    localStorage.setItem(MODEL_KEY, JSON.stringify(model));
    console.log(JSON.stringify(model, null, 2));
    cell.update({ model: () => model });
  },
  saveSettings: async (cell: MeiosisCell<State>, settings: Settings) => {
    // await settingsSvc.save(settings);
    cell.update({
      settings: () => settings,
    });
  },
  setSearchFilter: async (cell: MeiosisCell<State>, searchFilter?: string) => {
    if (searchFilter) {
      // localStorage.setItem(SEARCH_FILTER_KEY, searchFilter);
      cell.update({ searchFilter });
    } else {
      cell.update({ searchFilter: undefined });
    }
  },
  setRole: (cell: MeiosisCell<State>, role: UserRole) => {
    localStorage.setItem(USER_ROLE, role);
    cell.update({ role });
  },
  login: (_cell: MeiosisCell<State>) => {},
};

export const setSearchResults: Service<State> = {
  onchange: (state) => state.searchFilter,
  run: (cell) => {
    const state = cell.getState();
    const { searchFilter } = state;
    console.log(`Searching ${searchFilter}`);
    cell.update({ searchResults: () => [] });
  },
};

const config: MeiosisConfig<State> = {
  app: {
    initial: {
      page: Pages.HOME,
      loggedInUser: undefined,
      role: 'user',
      settings: {} as Settings,
    } as State,
    services: [setSearchResults],
  },
};
export const cells = meiosisSetup<State>(config);

cells.map(() => {
  // console.log('...redrawing');
  m.redraw();
});

const loadData = async () => {
  const role = (localStorage.getItem(USER_ROLE) || 'user') as UserRole;
  const ds = localStorage.getItem(MODEL_KEY);
  const model: DataModel = ds ? JSON.parse(ds) : EmptyDataModel();
  // const settings = (await settingsSvc.loadList()).shift() || ({} as Settings);

  cells().update({
    role,
    model: () => model,
    // settings: () => settings,
  });
};
loadData();
