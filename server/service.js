import fs from 'fs';
import fsPromisses from 'fs/promises'
import config from './config.js';
import { join, extname } from 'path';

const{
  dir:{
    publicDirectory
  }
} = config;

export class Service{
  createFileStream(filename){
    return fs.createReadStream(filename);
  }

  async getFileInfo(file){
    // home/index.html
    const fullFilePath = join(publicDirectory, file);
    //valida se existe, se nao existe erro!
    await fsPromisses.access(fullFilePath);
    const fileType = extname(fullFilePath);
    return{
      type: fileType,
      name: fullFilePath
    }
  }

  async getFileStream(file){
    const{
      name,
      type
    } = await this.getFileInfo(file)

    return {
      stream: this.createFileStream(name),
      type
    };
  }
};