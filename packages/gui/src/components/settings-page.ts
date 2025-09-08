import m from 'mithril';
import { Pages } from '../models';
import { actions, MeiosisComponent } from '../services';

export const SettingsPage: MeiosisComponent = () => {
  return {
    oninit: ({ attrs: { cell } }) => {
      actions.setPage(cell, Pages.SETTINGS);
    },
    view: () => {
      return m('#settings-page.settings.page', 'Settings');
    },
  };
};
