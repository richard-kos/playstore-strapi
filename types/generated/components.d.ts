import type { Schema, Struct } from '@strapi/strapi';

export interface LandingBulletLine extends Struct.ComponentSchema {
  collectionName: 'components_landing_bullet_lines';
  info: {
    description: 'Single checklist line for hero split columns';
    displayName: 'Bullet line';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LandingCreativeItem extends Struct.ComponentSchema {
  collectionName: 'components_landing_creative_items';
  info: {
    displayName: 'Creative showcase item';
    icon: 'play';
  };
  attributes: {
    developer: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    thumbnail: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    video: Schema.Attribute.Media<'videos'> & Schema.Attribute.Required;
  };
}

export interface LandingHeroAudience extends Struct.ComponentSchema {
  collectionName: 'components_landing_hero_audiences';
  info: {
    description: 'App Developers vs Game Publishers hero block';
    displayName: 'Hero audience';
    icon: 'cursor';
  };
  attributes: {
    audienceKey: Schema.Attribute.Enumeration<['apps', 'games']> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    otherCta: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCta: Schema.Attribute.String & Schema.Attribute.Required;
    splitLeft: Schema.Attribute.Component<'landing.hero-split-column', false>;
    splitRight: Schema.Attribute.Component<'landing.hero-split-column', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    values: Schema.Attribute.JSON & Schema.Attribute.Required;
  };
}

export interface LandingHeroSplitColumn extends Struct.ComponentSchema {
  collectionName: 'components_landing_hero_split_columns';
  info: {
    description: 'One column: Lucide icon, title, optional paragraph, optional checklist';
    displayName: 'Hero split column';
    icon: 'columns';
  };
  attributes: {
    body: Schema.Attribute.Text;
    bullets: Schema.Attribute.Component<'landing.bullet-line', true>;
    svgName: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LandingInsightPost extends Struct.ComponentSchema {
  collectionName: 'components_landing_insight_posts';
  info: {
    displayName: 'Insight / blog post';
    icon: 'file';
  };
  attributes: {
    authorAvatar: Schema.Attribute.Media<'images'>;
    authorName: Schema.Attribute.String;
    category: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    postDate: Schema.Attribute.DateTime;
    readTimeLabel: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LandingPartner extends Struct.ComponentSchema {
  collectionName: 'components_landing_partners';
  info: {
    displayName: 'Trusted partner / platform';
    icon: 'link';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface LandingTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_landing_testimonials';
  info: {
    displayName: 'Testimonial';
    icon: 'message';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    rating: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface LandingUaFeature extends Struct.ComponentSchema {
  collectionName: 'components_landing_ua_features';
  info: {
    displayName: 'User acquisition feature';
    icon: 'grid';
  };
  attributes: {
    colorFrom: Schema.Attribute.String & Schema.Attribute.Required;
    colorTo: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    svgName: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'landing.bullet-line': LandingBulletLine;
      'landing.creative-item': LandingCreativeItem;
      'landing.hero-audience': LandingHeroAudience;
      'landing.hero-split-column': LandingHeroSplitColumn;
      'landing.insight-post': LandingInsightPost;
      'landing.partner': LandingPartner;
      'landing.testimonial': LandingTestimonial;
      'landing.ua-feature': LandingUaFeature;
    }
  }
}
