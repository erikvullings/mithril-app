import m from 'mithril';
import { Pages } from '../models';
import { actions, type MeiosisComponent } from '../services';

export const SettingsPage: MeiosisComponent = () => {
  return {
    oninit: ({ attrs }) => {
      actions.setPage(attrs, Pages.SETTINGS);
    },
    view: () => {
      return m('#settings-page.settings.page', 'Settings');
    },
  };
};
