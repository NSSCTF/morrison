declare interface UserState {
    isLogin: boolean,
    userinfo: UserInfo,
    loginDate: Date | undefined
}

declare interface UserInfo {
    uid: number,
    username: string | undefined,
    avatar: string | undefined,
    token: string | undefined
}

declare type NoteType = 'ctf' | 'wp' | 'balderich';

declare type NoteCategoryType = {
    id: number,
    title: string,
    count: number
}

declare type NoteArticleType = {
    id: number,
    title: string,
    date: date,
    author: string,
    uid: number,
    tag: string
}

declare interface NoteState {
    setData: {
        ctf: NoteCategoryType[];
        wp: NoteCategoryType[];
        balderich: NoteCategoryType[];
    },
    submenus: {
        ctf: {
            [index: string]: NoteCategoryType[] | NoteArticleType[];
        },
        wp: {
            [index: string]: NoteCategoryType[] | NoteArticleType[];
        },
        balderich: {
            [index: string]: NoteCategoryType[] | NoteArticleType[];
        }
    },
    titles: {
        ctf: {
            [id: string]: string;
        },
        wp: {
            [id: string]: string;
        },
        balderich: {
            [id: string]: string;
        }
    }
}

declare type ProblemType = 'web' | 'pwn' | 'crypto' | 'reverse' | 'misc';

declare interface ProblemData {
    id: number,
    title: string,
    uid: number,
    author: string,
    tag: string[],
    likes: number,
    isLike: boolean,
    isAttempt: boolean,
    isSolve: boolean,
}

declare interface ProblemState {
    tableData: {
        web: {
            all: ProblemData[]
            [index: number]: ProblemData[]
        },
        pwn: {
            all: ProblemData[]
            [index: number]: ProblemData[]
        },
        crypto: {
            all: ProblemData[]
            [index: number]: ProblemData[]
        },
        reverse: {
            all: ProblemData[]
            [index: number]: ProblemData[]
        },
        misc: {
            all: ProblemData[]
            [index: number]: ProblemData[]
        }
    },
}