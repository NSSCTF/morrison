declare interface AdminState {
    info: {
        balderich: {
            total: {
                cpu: number,
                ram: number,
                rom: number,
                cpus: number,
                rams: number,
                roms: number,
            },
            serves: BalderichServeInfo[]
        },
        anna: {
            total: {
                cpu: number,
                ram: number,
                rom: number,
                cpus: number,
                rams: number,
                roms: number,
                dockers: number,
            },
            serves: AnnaServeInfo[]
        }
    }
}

declare interface BalderichServeInfo {
    ip: string,
    cpu: number,
    ram: number,
    rom: number,
    cpus: string,
    rams: string,
    roms: string
}

declare interface AnnaServeInfo {
    cpu: number,
    ram: number,
    rom: number,
    cpus: string,
    rams: string,
    roms: string,
    dockers: number,
}

declare interface UserState {
    isLogin: boolean,
    userinfo: UserInfo,
    loginDate: number | undefined
}

declare interface UserInfo {
    uid: number,
    username: string | undefined,
    level: number | undefined,
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
    tableData: any
    // {
    //     [number]: {
    //         all: ProblemData[]
    //         [index: number]: ProblemData[]
    //     },
    // },
}