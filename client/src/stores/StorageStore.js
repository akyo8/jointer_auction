import Web3 from "web3";
import {
  EventEmitter
} from "events";
import dispatcher from "../dispatcher";


class StorageStore extends EventEmitter {


  constructor() {
    super();
  }

  setStrorage(key,value){
    window.localStorage.setItem(key,value);
  }

  getStorage(key){
    return window.localStorage.getItem(key);
  }
  



  handleActions(action) {
    switch (action.type) {}
  }


}

const storageStore = new StorageStore();
dispatcher.register(storageStore.handleActions.bind(storageStore));
export default storageStore;


