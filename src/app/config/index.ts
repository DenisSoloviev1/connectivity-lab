class PagePath {
  constructor(readonly prefix: string) {}

  method = (path: string): string => `${this.prefix}/${path}`;

  get path(): string {
    return this.prefix;
  }

  get normalizedPath(): string {
    return this.method("").replace(/\/$/, "");
  }
}

class AppRouting extends PagePath {
  constructor(prefix: string) {
    super(prefix);
  }

  main = new PagePath(this.method(""));
  rest = new PagePath(this.method("rest"));
  socket = new PagePath(this.method("socket"));
  sse = new PagePath(this.method("sse"));
  webRTC = new PagePath(this.method("webRTC"));
}

export const appRouting = new AppRouting("");
