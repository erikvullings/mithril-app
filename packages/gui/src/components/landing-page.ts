import m from 'mithril';
import { Icon } from 'mithril-materialized';
import background from '../assets/background.jpg';
import { MeiosisComponent } from '../services';
import { Pages } from '../models';
import { actions } from '../services/meiosis';

export const LandingPage: MeiosisComponent = () => {
  return {
    oninit: ({ attrs }) => {
      actions.setPage(attrs, Pages.LANDING);
    },
    view: () => [
      m('div', { style: 'position: relative;' }, [
        m(
          '.overlay.center',
          {
            style: 'position: absolute; width: 100%',
          },
          [m('h3.primary-text', 'Introduction')]
        ),
        m('img.responsive-img.center', { src: background }),
        m(
          '.section',
          m('.row.container.center', [
            m('.row', [
              m(
                '.col.s12.m4',
                m('.intro-block', [
                  m('.center', m(Icon, { iconName: 'handshake' })),
                  m('h5.center', 'TODO'),
                  m('p.light', 'TODO'),
                ])
              ),
              m(
                '.col.s12.m4',
                m('.intro-block', [
                  m('.center', m(Icon, { iconName: 'front_hand' })),
                  m('h5.center', 'TODO'),
                  m('p.light', `TODO`),
                ])
              ),
              m(
                '.col.s12.m4',
                m('.intro-block', [
                  m('.center', m(Icon, { iconName: 'map' })),
                  m('h5.center', 'TODO'),
                  m('p.light', 'TODO'),
                ])
              ),
            ]),
          ])
        ),
      ]),
    ],
  };
};
