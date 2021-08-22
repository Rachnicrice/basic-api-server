'use strict';

class Collection {

  consrtuctor (model) {
    this.model = model;
  }

  async create (json) {
    try {
      let record = await this.model.create(json);
      return record;
      
    } catch (err) {
      console.error('failed to create record');
    }
  }

  async read (id) {
    try {
      let records = null;

      if(id) {
        records = await this.model.findOne({ where: { id } });
      } else {
        records = await this.model.findAll();
      }
  
      return records;

    } catch(err) {
      console.error('failed to retrieve resource');
    }
  }

  async update(id, json) {
    try {
      if (!id) throw new Error('no id provided');

      let record = await this.model.findOne({ where: { id } });
      let updatedRecord = await record.update(json);

      return updatedRecord;

    } catch(err) {
      console.error('failed to update item');
    }
  }

  async delete(id) {
    try {
      if (!id) throw new Error('no id provided - cannot delete item');
      let deletedRecord = await this.model.destory({ where: { id }});
      return deletedRecord;

    } catch(err) {
      console.error('failed to delete item');
    }
  }
}

module.exports = Collection;