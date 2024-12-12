import m from 'mithril';
import { Languages, MeiosisComponent, UserRole, i18n, routingSvc, t } from '../../services';
import { FlatButton, ISelectOptions, ModalPanel, Select, padLeft } from 'mithril-materialized';
import { DataModel, Page, Pages, EmptyDataModel } from '../../models';
import { formatDate, isActivePage } from '../../utils';
import { LanguageSwitcher } from './language-switcher';

export const SideNav: MeiosisComponent = () => {
  const handleFileUpload = (binary: boolean, saveModel: (model: DataModel) => void) => (e: Event) => {
    const fileInput = e.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length <= 0) return;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        let result: DataModel;
        result = JSON.parse(e.target.result.toString()) as DataModel;
        if (result && result.version) {
          saveModel(result);
          routingSvc.switchTo(Pages.HOME);
        } else {
          console.error('Invalid file format');
        }
      }
    };

    if (binary) {
      reader.readAsArrayBuffer(fileInput.files[0]);
    } else {
      reader.readAsText(fileInput.files[0]);
    }
  };

  const handleSelection = (option: string, model: DataModel, saveModel: (model: DataModel) => void) => {
    switch (option) {
      case 'clear':
        console.log('CLEARING DATAS');
        saveModel(EmptyDataModel());
        break;
      case 'download_json': {
        const version = typeof model.version === 'undefined' ? 1 : ++model.version;
        const dataStr =
          'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ ...model, version }, null, 2));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute('href', dataStr);
        dlAnchorElem.setAttribute('download', `${formatDate()}_v${padLeft(version, 3)}_crime_scripts.json`);
        dlAnchorElem.click();
        break;
      }
      case 'upload_json': {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.onchange = handleFileUpload(false, saveModel);
        fileInput.click();
        break;
      }
    }
  };

  return {
    view: ({
      attrs: {
        state,
        actions: { saveModel, setRole, changePage },
      },
    }) => {
      const { model, role, page } = state;
      const roleIcon = role === 'user' ? 'person' : role === 'editor' ? 'edit' : 'manage_accounts';

      const isActive = isActivePage(page);

      return m(
        'ul#slide-out.sidenav.row',
        {
          oncreate: ({ dom }) => {
            M.Sidenav.init(dom);
          },
        },
        [
          routingSvc
            .getList()
            .filter(
              (d) =>
                d.id !== Pages.LANDING &&
                ((typeof d.visible === 'boolean' ? d.visible : d.visible(state)) || isActive(d))
            )
            .map((d: Page) =>
              m('li.hide-on-med-and-up', { class: isActive(d) }, [
                m(FlatButton, {
                  label: d.title,
                  className: d.iconClass ? ` ${d.iconClass}` : '',
                  // style,
                  iconName: typeof d.icon === 'string' ? d.icon : d.icon ? d.icon() : '',
                  // href: routingSvc.href(d.id),
                  onclick: () => changePage(d.id),
                }),
                // ),
              ])
            ),
          m(
            'li',
            m(FlatButton, {
              label: t('CLEAR'),
              iconName: 'clear',
              modalId: 'clear_model',
            })
          ),
          m(
            'li',
            m(FlatButton, {
              label: t('DOWNLOAD'),
              onclick: () => handleSelection('download_json', model, saveModel),
              iconName: 'download',
            })
          ),
          m(
            'li',
            m(FlatButton, {
              label: t('UPLOAD'),
              onclick: () => handleSelection('upload_json', model, saveModel),
              iconName: 'upload',
            })
          ),
          m(
            'li',
            m(FlatButton, {
              label: t('PERMALINK'),
              onclick: () => handleSelection('link', model, saveModel),
              iconName: 'link',
            })
          ),
          m(
            'li',
            m(Select, {
              checkedId: role,
              label: t('ROLE'),
              iconName: roleIcon,
              options: [
                { id: 'user', label: t('USER') },
                { id: 'editor', label: t('EDITOR') },
                { id: 'admin', label: t('ADMIN') },
              ],
              onchange: (role) => {
                setRole(role[0]);
              },
            } as ISelectOptions<UserRole>)
          ),
          m(
            'li',
            m(LanguageSwitcher, {
              onLanguageChange: async (language: Languages) => {
                await i18n.loadAndSetLocale(language as Languages);
              },
              currentLanguage: i18n.currentLocale,
            })
          ),
        ]
        // m(ModalPanel, {
        //   id: 'clear_model',
        //   title: t('DELETE_ITEM', 'TITLE', { item: t('MODEL') }),
        //   description: t('DELETE_ITEM', 'DESCRIPTION', { item: t('MODEL').toLowerCase() }),
        //   buttons: [
        //     { label: t('CANCEL'), iconName: 'cancel' },
        //     {
        //       label: t('DELETE'),
        //       iconName: 'delete',
        //       onclick: () => {
        //         handleSelection('clear', model, saveModel);
        //       },
        //     },
        //   ],
        // })
      );
    },
  };
};

export const SideNavTrigger: MeiosisComponent<{}> = () => {
  return {
    view: ({
      attrs: {
        actions: { saveModel },
      },
    }) => {
      return [
        m(
          'a',
          {
            href: '#!',
            'data-target': 'slide-out',
            class: 'sidenav-trigger',
            style: 'position: absolute;margin-left: 10px;top: 75px;',
          },
          m('i.material-icons', 'menu')
        ),
        m(ModalPanel, {
          id: 'clear_model',
          title: t('DELETE_ITEM', 'TITLE', { item: t('MODEL') }),
          description: t('DELETE_ITEM', 'DESCRIPTION', { item: t('MODEL').toLowerCase() }),
          buttons: [
            { label: t('CANCEL'), iconName: 'cancel' },
            {
              label: t('DELETE'),
              iconName: 'delete',
              onclick: () => {
                saveModel(EmptyDataModel());
              },
            },
          ],
        }),
      ];
    },
  };
};
