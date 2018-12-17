/**
 * Message Model defined
 * @author SevensChan <297495165@qq.com>
 */
import BaseModel from './base.model'
import config from '../config'
import assert from 'assert'

export default class MessageModel extends BaseModel{
  constructor (options) {
    super(options)
    this.time = config.default_time
    assert.equal(true, !!this.id, 'ParamInvaild: `id` of Message can not be empty')
  }
}