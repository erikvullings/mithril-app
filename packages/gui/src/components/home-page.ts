import m from 'mithril';
import { Pages } from '../models';
import { type MeiosisComponent } from '../services';
import { actions } from '../services/meiosis';

export const HomePage: MeiosisComponent = () => {
  return {
    oninit: ({ attrs }) => actions.setPage(attrs, Pages.HOME),
    view: () => {
      return [m('#home-page.row.home.page', 'HOME-PAGE')];
    },
  };
};
