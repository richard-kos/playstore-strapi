/**
 * landing-page controller — deep-populate relations & nested components by default.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::landing-page.landing-page', () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        section1Hero: {
          populate: {
            splitLeft: { populate: ['bullets'] },
            splitRight: { populate: ['bullets'] },
          },
        },
        section2Partners: { populate: ['image'] },
        section3Features: true,
        section4Items: { populate: ['thumbnail', 'video'] },
        section5Testimonials: {
          populate: {
            avatar: true,
          },
        },
      },
    };

    return await super.find(ctx);
  },
}));
