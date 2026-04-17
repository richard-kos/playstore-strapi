/**
 * blog-post controller — populate image + author avatar for REST responses.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog-post.blog-post', () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        image: true,
        authorAvatar: true,
        categories: true,
      },
    };
    return await super.find(ctx);
  },

  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        image: true,
        authorAvatar: true,
        categories: true,
      },
    };
    return await super.findOne(ctx);
  },
}));
