/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/posts.json": {
        parameters: {
            query?: {
                limit?: components["schemas"]["postsLimit"];
                tags?: components["parameters"]["Tags"];
                page?: components["parameters"]["Page"];
                only?: components["parameters"]["Only"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Posts list */
        get: {
            parameters: {
                query?: {
                    limit?: components["schemas"]["postsLimit"];
                    tags?: components["parameters"]["Tags"];
                    page?: components["parameters"]["Page"];
                    only?: components["parameters"]["Only"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Response 200 */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["posts"];
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts/{id}.json": {
        parameters: {
            query?: {
                only?: components["parameters"]["Only"];
            };
            header?: never;
            path: {
                id: components["schemas"]["postID"];
            };
            cookie?: never;
        };
        /** @description Show post */
        get: {
            parameters: {
                query?: {
                    only?: components["parameters"]["Only"];
                };
                header?: never;
                path: {
                    id: components["schemas"]["postID"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Response 200 */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["post"];
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts/random.json": {
        parameters: {
            query?: {
                only?: components["parameters"]["Only"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get random post */
        get: {
            parameters: {
                query?: {
                    only?: components["parameters"]["Only"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Response 200 */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["post"];
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users.json": {
        parameters: {
            query?: {
                tags?: components["parameters"]["Tags"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get list of users */
        get: {
            parameters: {
                query?: {
                    tags?: components["parameters"]["Tags"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Response 200 */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["users"];
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}.json": {
        parameters: {
            query?: {
                tags?: components["parameters"]["Tags"];
            };
            header?: never;
            path: {
                id: components["schemas"]["userID"];
            };
            cookie?: never;
        };
        /** @description Get user */
        get: {
            parameters: {
                query?: {
                    tags?: components["parameters"]["Tags"];
                };
                header?: never;
                path: {
                    id: components["schemas"]["userID"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Response 200 */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["user"];
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/autocomplete.json": {
        parameters: {
            query?: {
                "search[type]"?: "tag" | "user" | "artist";
                "search[query]"?: string;
                limit?: components["schemas"]["limit"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get autocomplete */
        get: {
            parameters: {
                query?: {
                    "search[type]"?: "tag" | "user" | "artist";
                    "search[query]"?: string;
                    limit?: components["schemas"]["limit"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Response 200 */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["autocomplete"];
                    };
                };
                400: components["responses"]["BadRequest"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        autocomplete: {
            /** @constant */
            type: "tag";
            label: string;
            value: string;
            /** @constant */
            category: 1;
        }[] | {
            /** @constant */
            type: "tag-word";
            label: string;
            value: string;
            category: 0 | 1 | 3 | 4 | 5;
            post_count: number;
        }[] | {
            /** @constant */
            type: "user";
            label: string;
            value: string;
            id: number;
            /** @enum {string} */
            level: "member" | "gold" | "platinum" | "builder" | "admin";
        }[];
        forbidden: unknown;
        limit: number;
        notFound: {
            success: boolean;
            error: string;
            message: string;
        };
        only: string;
        page: number;
        post: {
            id: components["schemas"]["postID"];
            uploader_id: number;
            approver_id?: number | null;
            tag_string: string;
            tag_string_general: string;
            tag_string_artist: string;
            tag_string_copyright: string;
            tag_string_character: string;
            tag_string_meta: string;
            rating: ("g" | "s" | "q" | "e") | null;
            parent_id?: number | null;
            /** Format: uri */
            source: string;
            md5: string;
            /** @enum {string} */
            file_ext: "png" | "jpg" | "gif" | "swf" | "webm" | "mp4" | "zip";
            file_size: number;
            /** Format: uri */
            file_url: string;
            /** Format: uri */
            large_file_url: string;
            /** Format: uri */
            preview_file_url: string;
            score: number;
            fav_count: number;
            tag_count: number;
            tag_count_general: number;
            tag_count_artist: number;
            tag_count_copyright: number;
            tag_count_character: number;
            tag_count_meta: number;
            image_width: number;
            image_height: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            last_comment_bumped_at?: string | null;
            last_commented_at?: string | null;
            last_noted_at?: string | null;
            media_asset: {
                id: number;
                /** Format: date-time */
                created_at: string;
                /** Format: date-time */
                updated_at: string;
                md5: string;
                file_ext: string;
                file_size: number;
                image_width: number;
                image_height: number;
                duration?: number | null;
                status: string;
                file_key: string;
                is_public: boolean;
                pixel_hash: string;
                variants: {
                    type: string;
                    /** Format: uri */
                    url: string;
                    width: number;
                    height: number;
                    file_ext: string;
                }[];
            };
            up_score: number;
            down_score: number;
            pixiv_id?: number | null;
            bit_flags: number;
            has_active_children: boolean;
            has_children: boolean;
            has_large: boolean;
            has_visible_children: boolean;
            is_banned: boolean;
            is_deleted: boolean;
            is_flagged: boolean;
            is_pending: boolean;
        };
        postID: number;
        posts: components["schemas"]["post"][];
        postsLimit: number;
        unauthorized: unknown;
        user: {
            id: components["schemas"]["userID"];
            name: string;
            /** @enum {string} */
            level: "10" | "20" | "30" | "31" | "32" | "40" | "50";
            inviter_id: number | null;
            post_update_count: number;
            note_update_count: number;
            post_upload_count: number;
            favorite_count: number;
            unread_dmail_count: number;
            is_banned: boolean;
            bit_prefs: number;
            /** @enum {string} */
            theme: "light" | "dark";
            favorite_tags: string;
            blacklisted_tags: string;
            comment_threshold: number;
            timezone: string;
            per_page: number;
            /** @enum {string} */
            default_image_size: "large" | "original";
            custom_css: string;
            upload_points: number;
            /** Format: date-time */
            last_forum_read_at: string;
            /** Format: date-time */
            last_logged_in_at: string;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        users: components["schemas"]["user"][];
        userID: number;
    };
    responses: {
        /** @description The given parameters could not be parsed */
        BadRequest: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": unknown;
            };
        };
        /** @description Authentication failed */
        Unauthorized: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["unauthorized"];
            };
        };
        /** @description Access denied */
        Forbidden: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["forbidden"];
            };
        };
        /** @description Not Found */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["notFound"];
            };
        };
    };
    parameters: {
        Page: components["schemas"]["page"];
        Only: components["schemas"]["only"];
        Tags: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
