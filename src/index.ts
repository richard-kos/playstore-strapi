import type { Core } from '@strapi/strapi';

const PUBLIC_READ_ACTIONS = [
  /** Single type — marketing landing */
  'api::landing-page.landing-page.find',
  /** Collection — `/portfolio` page in playstore-mvp */
  'api::portfolio.portfolio.find',
  /** Collection — `/blog` page in playstore-mvp */
  'api::blog-post.blog-post.find',
  /**
   * Required so `categories` on blog posts can be populated over the public REST API.
   * Without this, Strapi omits category data and the MVP cannot show category labels/links.
   */
  'api::blog-category.blog-category.find',
] as const;

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * Grant public read access so the headless frontend can fetch Strapi REST
   * without an API token (same as manual Settings → Users & Permissions → Public).
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const dbClient = strapi.config.get('database.connection.client') as string | undefined;
    if (dbClient === 'sqlite') {
      try {
        await strapi.db.connection.raw('PRAGMA journal_mode = WAL');
        await strapi.db.connection.raw('PRAGMA busy_timeout = 5000');
        strapi.log.info('[bootstrap] SQLite: WAL journal + 5000ms busy_timeout');
      } catch (err) {
        strapi.log.warn(`[bootstrap] SQLite pragma setup skipped: ${err}`);
      }
    }

    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      return;
    }

    for (const action of PUBLIC_READ_ACTIONS) {
      const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: {
          action,
          role: publicRole.id,
        },
      });

      if (existing) {
        continue;
      }

      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action,
          role: publicRole.id,
        },
      });

      strapi.log.info(`[bootstrap] Enabled ${action} for Public role`);
    }
  },
};
