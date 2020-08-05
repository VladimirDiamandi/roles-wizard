declare module 'vue/types/vue' {
  interface Vue {
    $emit(key: string, data: object): void;
    $on(key: string, fn: void): void;
    $off(key: string): void;
  }
}
