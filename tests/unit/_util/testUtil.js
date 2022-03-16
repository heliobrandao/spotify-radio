import { jest } from '@jest/globals';
import {
  Readable,
  Writable
}from 'stream';
import { handler } from '../../../server/routes';
export default class TestUtil {

  static generateReadableStream(data){
    return new Readable({
      read(){
        for(const item of data){
          this.push(item)
        }

        this.push(null)
      }
    })
  }

  static generateWritebleStream(ondata){
    return new Writable({
      write(chunk, enc, cb){
        ondata(chunk)
        cb(null, chunk)
      }
    })
  }

  static defaltHandleParams(){
    const requestStream = TestUtil.generateReadableStream(['body da requisição']);
    const response = TestUtil.generateWritebleStream(()=>{});
    const data ={
      request: Object.assign(requestStream, {
        headers: {},
        method: '',
        url: ''
      }),
      response: Object.assign(response, {
        writeHead:jest.fn(),
        end:jest.fn()
      })

      }
      return {
        values: () => Object.values(data),
        ...data,

    }
  }
}