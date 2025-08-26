import m from 'mithril';
import { ISelectOptions, Select } from 'mithril-materialized';
import { Pages } from '../models';
import { MeiosisComponent, UserRole, actions, t } from '../services';

export const AboutPage: MeiosisComponent = () => {
  return {
    oninit: ({ attrs }) => actions.setPage(attrs, Pages.ABOUT),
    view: ({ attrs }) => {
      const { role } = attrs.state;
      const roleIcon = role === 'user' ? 'person' : role === 'editor' ? 'edit' : 'manage_accounts';

      return m('#about-page.row.about.page', [
        m(Select, {
          checkedId: role,
          iconName: roleIcon,
          options: [
            { id: 'user', label: t('USER') },
            { id: 'editor', label: t('EDITOR') },
            { id: 'admin', label: t('ADMIN') },
          ],
          onchange: (role) => {
            actions.setRole(attrs, role[0]);
          },
        } as ISelectOptions<UserRole>),
        m('.col.s12', 'About'),
      ]);
    },
  };
};
