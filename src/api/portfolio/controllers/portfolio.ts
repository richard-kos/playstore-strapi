/**
 * portfolio controller — populate image + video media for REST responses.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::portfolio.portfolio', () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        image: true,
        video: true,
      },
    };
    return await super.find(ctx);
  },

  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        image: true,
        video: true,
      },
    };
    return await super.findOne(ctx);
  },
}));
