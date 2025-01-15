import MyBaseModel from './helpers/MyBaseModel';

export default class Session extends MyBaseModel {
  static entity = 'session';
  static entityUrl = '/api/session';
  static primaryKey = 'id';

  static parentWithables = [
  ];


  static fields() {
    return {
      'user': this.attr({}),
      'accessToken': this.attr(''),
      'expireDate': this.attr(''),
    };
  }

  static FetchAll(relationships = [], flags = {}, moreHeaders = {}, options = { page: 1, limit: 15, filters: {}, clearPrimaryModelOnly: false }) {
    return this.customSupabaseApiFetchAll(
      `${this.baseUrl}${this.entityUrl}`,
      [...this.parentWithables, ...relationships],
      flags,
      this.mergeHeaders(moreHeaders),
      options,
      this
    );
  }

  static FetchById(id, relationships = [], flags = {}, moreHeaders = {}) {
    return this.customSupabaseApiFetchById(
      `${this.baseUrl}${this.entityUrl}`,
      id,
      [...this.parentWithables, ...relationships],
      flags,
      this.mergeHeaders(moreHeaders),
      this
    );
  }

  static Store(entity, relationships = [], flags = {}, moreHeaders = {}) {
    return this.customSupabaseApiStore(
      `${this.baseUrl}${this.entityUrl}`,
      entity,
      [...this.parentWithables, ...relationships],
      flags,
      this.mergeHeaders(moreHeaders),
      this
    );
  }

  static Update(entity, relationships = [], flags = {}, moreHeaders = {}) {
    return this.customSupabaseApiUpdate(
      `${this.baseUrl}${this.entityUrl}`,
      entity,
      [...this.parentWithables, ...relationships],
      flags,
      this.mergeHeaders(moreHeaders),
      this
    );
  }

  static Delete(entityId, options = { flags: {}, moreHeaders: {} }) {
    return this.customSupabaseApiDelete(
      `${this.baseUrl}${this.entityUrl}`,
      entityId,
      options.flags,
      this.mergeHeaders(options.moreHeaders),
      this
    );
  }


  static signIn(entity, relationships = [], flags = {}, moreHeaders = {}) {
    return this.customSupabaseApiStore(
      `${this.baseUrl}/api/login`,
      entity,
      [...this.parentWithables, ...relationships],
      flags,
      this.mergeHeaders(moreHeaders),
      this
    );
  }
}
