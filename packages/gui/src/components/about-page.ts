import m from 'mithril';
import { Select } from 'mithril-materialized';
import { Pages } from '../models';
import { MeiosisComponent, UserRole, actions, t } from '../services';

export const AboutPage: MeiosisComponent = () => {
  return {
    oninit: ({ attrs }) => actions.setPage(attrs.cell, Pages.ABOUT),
    view: ({ attrs }) => {
      const { role } = attrs.cell.state;
      const roleIcon = role === 'user' ? 'person' : role === 'editor' ? 'edit' : 'manage_accounts';

      return m('#about-page.row.about.page', [
        m(Select<UserRole>, {
          checkedId: role,
          iconName: roleIcon,
          options: [
            { id: 'user', label: t('USER') },
            { id: 'editor', label: t('EDITOR') },
            { id: 'admin', label: t('ADMIN') },
          ],
          onchange: (role) => {
            actions.setRole(attrs.cell, role[0]);
          },
        }),
        m('.col.s12', 'About'),
      ]);
    },
  };
};
