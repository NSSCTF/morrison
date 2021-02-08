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