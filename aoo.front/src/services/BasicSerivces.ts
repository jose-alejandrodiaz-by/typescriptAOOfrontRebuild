// import { ApiURL } from '../common_tools/ApiURL';
import {UpdateToken,getInstance} from "./UpdateToken"
export async function getBasicPlatforms() {
  await UpdateToken("Basic")
  const instance = getInstance()
  if(instance){
    return await instance.get('Platforms')
  }else{
    throw new Error("Instance is null")
  }
  }
  
export async function getBasicModules(){  
    await UpdateToken("Basic")
    const instance = getInstance()
    if (instance){
        return await instance.get('Modules/')}
    else{
        throw new Error("Instance is null")
    }
}

export async function getBasicEnvironments(){
    await UpdateToken("Basic")
    const instance = getInstance()
    if(instance){
        return await instance.get('Environments/')}
    else{
        throw new Error("Instance is null")
        }
}

export async function getBasicProjectTypes(){
    await UpdateToken("Basic")
    const instance = getInstance()
  if(instance){
    return await instance.get('ProjectTypes/')}
    else{
        throw new Error("Instance is null")
    }
}

export async function getBasicIssues(){
    await UpdateToken("Basic")
    const instance = getInstance()
  if(instance){
    return await instance.get('IssueTypes/')}
    else{
        throw new Error("Instance is null")
    }
}