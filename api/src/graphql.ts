
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PostsOut {
    message: string;
}

export class PostOut {
    id: string;
    text: string;
}

export class PostCreated {
    id: string;
    message: string;
}

export class LoginOut {
    message?: string;
    error?: string;
    token?: string;
}

export abstract class IQuery {
    abstract readPost(): PostsOut | Promise<PostsOut>;

    abstract getPosts(): PostOut[] | Promise<PostOut[]>;
}

export abstract class IMutation {
    abstract editPost(id: number, text: string): PostsOut | Promise<PostsOut>;

    abstract deletePost(id: number): PostsOut | Promise<PostsOut>;

    abstract createPost(text: string): PostCreated | Promise<PostCreated>;

    abstract login(password: string, email: string): LoginOut | Promise<LoginOut>;
}
