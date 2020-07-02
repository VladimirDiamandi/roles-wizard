
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class LoginOut {
    message?: string;
    error?: string;
    token?: string;
}

export class PostsOut {
    message: string;
}

export class PostCreated {
    id: string;
    message: string;
}

export abstract class IQuery {
    abstract readPost(): PostsOut | Promise<PostsOut>;
}

export abstract class IMutation {
    abstract login(password: string, email: string): LoginOut | Promise<LoginOut>;

    abstract editPost(): PostsOut | Promise<PostsOut>;

    abstract deletePost(): PostsOut | Promise<PostsOut>;

    abstract createPost(text: string): PostCreated | Promise<PostCreated>;
}
