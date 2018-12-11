/**
 * Base Model
 */
import fieldMap from '../config/fields.json'
import _ from 'lodash'

let fieldsMap = _.cloneDeep(fieldMap)

export default class BaseModel {

  constructor (options) {
    this._className = this.constructor.name.replace('Model','').toLowerCase()

    // 动态设定字段getter setter
    Object.values(this.fields()).forEach(field => {
      Object.defineProperty(this, field, {
        get () {
          return this[`_${field}`]
        },
        set (data) {
          this[`_${field}`] = data
        }
      })
    })

    // 赋值
    Object.values(this.fields()).forEach(ele => {
      this[ele] = options[ele]
    })
  }

  static get fieldMapping () {
    return fieldsMap
  }

  static set fieldMapping ({ type, config }) {
    fieldsMap[type] = {
      ...fieldsMap[type],
      ...config
    }
  }

  fields () {
    return fieldsMap[this._className]
  }
}