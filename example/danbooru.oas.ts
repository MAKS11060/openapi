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
        get: operations["list_posts"];
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
        get: operations["get_post"];
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
        get: operations["get_random_post"];
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
        get: operations["list_users"];
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
        get: operations["get_user"];
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
        get: operations["get_autocomplete"];
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
            /**
             * @description The type of the autocomplete item, must be "tag"
             * @constant
             */
            type: "tag";
            /** @description The label of the autocomplete item */
            label: string;
            /** @description The value of the autocomplete item */
            value: string;
            /**
             * @description The category of the autocomplete item, must be 1 for artists
             * @constant
             */
            category: 1;
        }[] | {
            /**
             * @description The type of the autocomplete item, must be "tag-word"
             * @constant
             */
            type: "tag-word";
            /** @description The label of the autocomplete item */
            label: string;
            /** @description The value of the autocomplete item */
            value: string;
            /** @description The category of the autocomplete item, includes [0, 1, 3, 4, 5] */
            category: 0 | 1 | 3 | 4 | 5;
            /** @description The count of posts associated with the tag, must be >= 0 */
            post_count: number;
        }[] | {
            /**
             * @description The type of the autocomplete item, must be "user"
             * @constant
             */
            type: "user";
            /** @description The label of the autocomplete item */
            label: string;
            /** @description The value of the autocomplete item */
            value: string;
            /** @description The ID of the user, must be greater than 0 */
            id: number;
            /**
             * @description The level of the user
             * @enum {string}
             */
            level: "member" | "gold" | "platinum" | "builder" | "admin";
        }[];
        /** @description Access denied */
        forbidden: unknown;
        /** @description The number of results to show per page */
        limit: number;
        /** @description Not found */
        notFound: {
            success: boolean;
            error: string;
            message: string;
        };
        /** @description Determines the list of attributes that will be returned */
        only: string;
        /** @description The number of results to show per page */
        page: number;
        post: {
            id: components["schemas"]["postID"];
            /** @description The ID of the user who uploaded the post */
            uploader_id: number;
            /** @description The ID of the user who approved the post */
            approver_id?: number | null;
            /** @description The tags associated with the post */
            tag_string: string;
            /** @description The general tags associated with the post */
            tag_string_general: string;
            /** @description The artist tags associated with the post */
            tag_string_artist: string;
            /** @description The copyright tags associated with the post */
            tag_string_copyright: string;
            /** @description The character tags associated with the post */
            tag_string_character: string;
            /** @description The meta tags associated with the post */
            tag_string_meta: string;
            /** @description The rating of the post */
            rating: ("g" | "s" | "q" | "e") | null;
            /** @description The ID of the parent post */
            parent_id?: number | null;
            /**
             * Format: uri
             * @description The source of the post
             */
            source: string;
            /** @description The MD5 hash of the file */
            md5: string;
            /**
             * @description The file extension
             * @enum {string}
             */
            file_ext: "png" | "jpg" | "gif" | "swf" | "webm" | "mp4" | "zip";
            /** @description The size of the file */
            file_size: number;
            /**
             * Format: uri
             * @description The URL of the file
             */
            file_url: string;
            /**
             * Format: uri
             * @description The URL of the large file
             */
            large_file_url: string;
            /**
             * Format: uri
             * @description The URL of the preview file
             */
            preview_file_url: string;
            /** @description The score of the post */
            score: number;
            /** @description The number of favorites */
            fav_count: number;
            /** @description The total number of tags */
            tag_count: number;
            /** @description The number of general tags */
            tag_count_general: number;
            /** @description The number of artist tags */
            tag_count_artist: number;
            /** @description The number of copyright tags */
            tag_count_copyright: number;
            /** @description The number of character tags */
            tag_count_character: number;
            /** @description The number of meta tags */
            tag_count_meta: number;
            /** @description The width of the image */
            image_width: number;
            /** @description The height of the image */
            image_height: number;
            /**
             * Format: date-time
             * @description The timestamp when the post was created
             */
            created_at: string;
            /**
             * Format: date-time
             * @description The timestamp when the post was last updated
             */
            updated_at: string;
            /** @description The timestamp when the last comment was bumped */
            last_comment_bumped_at?: string | null;
            /** @description The timestamp when the last comment was added */
            last_commented_at?: string | null;
            /** @description The timestamp when the last note was added */
            last_noted_at?: string | null;
            /** @description The media asset associated with the post */
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
            /** @description The up score of the post */
            up_score: number;
            /** @description The down score of the post */
            down_score: number;
            /** @description The Pixiv ID of the post */
            pixiv_id?: number | null;
            /** @description The bit flags of the post */
            bit_flags: number;
            /** @description Indicates whether the post has active children */
            has_active_children: boolean;
            /** @description Indicates whether the post has children */
            has_children: boolean;
            /** @description Indicates whether the post has a large version */
            has_large: boolean;
            /** @description Indicates whether the post has visible children */
            has_visible_children: boolean;
            /** @description Indicates whether the post is banned */
            is_banned: boolean;
            /** @description Indicates whether the post is deleted */
            is_deleted: boolean;
            /** @description Indicates whether the post is flagged */
            is_flagged: boolean;
            /** @description Indicates whether the post is pending */
            is_pending: boolean;
        };
        /** @description The post ID */
        postID: number;
        posts: components["schemas"]["post"][];
        postsLimit: number;
        /** @description Authentication failed */
        unauthorized: unknown;
        user: {
            id: components["schemas"]["userID"];
            /** @description The name of the user */
            name: string;
            /**
             * @description The level of the record
             * @enum {string}
             */
            level: "10" | "20" | "30" | "31" | "32" | "40" | "50";
            /** @description The ID of the inviter, must be greater than 0 */
            inviter_id: number | null;
            /** @description The count of post updates */
            post_update_count: number;
            /** @description The count of note updates */
            note_update_count: number;
            /** @description The count of post uploads */
            post_upload_count: number;
            /** @description The count of favorites */
            favorite_count: number;
            /** @description The count of unread direct messages */
            unread_dmail_count: number;
            /** @description Indicates whether the record is banned */
            is_banned: boolean;
            /** @description Bit preferences, each bit stores a boolean value */
            bit_prefs: number;
            /**
             * @description The theme of the record
             * @enum {string}
             */
            theme: "light" | "dark";
            /** @description The favorite tags of the record */
            favorite_tags: string;
            /** @description The blacklisted tags of the record */
            blacklisted_tags: string;
            /** @description The comment threshold of the record */
            comment_threshold: number;
            /** @description The timezone of the record */
            timezone: string;
            /** @description The number of items per page, must be between 1 and 200 */
            per_page: number;
            /**
             * @description The default image size of the record
             * @enum {string}
             */
            default_image_size: "large" | "original";
            /** @description The custom CSS of the record */
            custom_css: string;
            /** @description The upload points of the record */
            upload_points: number;
            /**
             * Format: date-time
             * @description The timestamp when the forum was last read
             */
            last_forum_read_at: string;
            /**
             * Format: date-time
             * @description The timestamp when the user last logged in
             */
            last_logged_in_at: string;
            /**
             * Format: date-time
             * @description The timestamp when the record was created
             */
            created_at: string;
            /**
             * Format: date-time
             * @description The timestamp when the record was last updated
             */
            updated_at: string;
        };
        /** @description The user ID */
        userID: number;
        users: components["schemas"]["user"][];
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
export interface operations {
    list_posts: {
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
    get_post: {
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
    get_random_post: {
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
    list_users: {
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
    get_user: {
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
    get_autocomplete: {
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
}
