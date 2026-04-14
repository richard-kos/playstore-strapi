import type { Core } from '@strapi/strapi';

const PUBLIC_LANDING_ACTION = 'api::landing-page.landing-page.find' as const;

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * Grant public read access to the landing page single type so the headless
   * frontend can fetch `/api/landing-page` without an API token after deploy.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      return;
    }

    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: {
        action: PUBLIC_LANDING_ACTION,
        role: publicRole.id,
      },
    });

    if (existing) {
      return;
    }

    await strapi.db.query('plugin::users-permissions.permission').create({
      data: {
        action: PUBLIC_LANDING_ACTION,
        role: publicRole.id,
      },
    });

    strapi.log.info(`[bootstrap] Enabled ${PUBLIC_LANDING_ACTION} for Public role`);
  },
};
