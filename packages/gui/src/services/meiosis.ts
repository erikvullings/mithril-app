import { meiosisSetup } from 'meiosis-setup';
import { MeiosisCell, MeiosisConfig, Service } from 'meiosis-setup/types';
import m, { FactoryComponent } from 'mithril';
import { routingSvc } from '.';
import { DataModel, Pages, Settings } from '../models';
import { User, UserRole } from './login-service';
import { scrollToTop } from '../utils';

export const EmptyDataModel = () =>
  ({
    version: 1,
    lastUpdate: Date.now(),
  } as DataModel);

// const settingsSvc = restServiceFactory<Settings>('settings');
const MODEL_KEY = 'MITHRIL_APP_MODEL';
const USER_ROLE = 'USER_ROLE';
export const APP_TITLE = 'MITHRIL-APP';
export const APP_TITLE_SHORT = 'MITHRIL-APP-SHORT';

export interface State {
  page: Pages;
  model: DataModel;
  loggedInUser?: User;
  role: UserRole;
  settings: Settings;
  searchFilter: string;
  searchResults: any[];
}

export interface Actions {
  setPage: (page: Pages, info?: string) => void;
  changePage: (
    page: Pages,
    params?: Record<string, string | number | undefined>,
    query?: Record<string, string | number | undefined>
  ) => void;
  saveModel: (ds: DataModel) => void;
  saveSettings: (settings: Settings) => Promise<void>;
  setRole: (role: UserRole) => void;
  setSearchFilter: (searchFilter?: string) => Promise<void>;
  login: () => void;
}

export type MeiosisComponent<A = {}> = FactoryComponent<{ cell: MeiosisCell<State> } & A>;

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
