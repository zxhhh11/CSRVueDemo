import { Actions, actions } from './actions';
/*
 * @Description: setting moudle
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-05 15:39:26
 */
import {
  CommitOptions,
  DispatchOptions,
  Module,
  Store as VuexStore
} from 'vuex';
import { Mutations, mutations } from './mutations';

// TODO: How to surpass cyclical dependency linting errors cleanly?
import { RootState } from '@/store/index';
import type { UserState } from './state';
import { state } from './state';

export { UserState };

export type UserStore<S = UserState> = Omit<
  VuexStore<S>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
export const store: Module<UserState, RootState> = {
  state,
  mutations,
  actions
  // TODO: With namespaced option turned on, having problem how to use dispatch with action types...
  // But without it, a bigger store might have clashes in namings
  // namespaced: true,
};
