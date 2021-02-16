const handleNavTree = (content: string, l1: number, l2: number) => {
    let navs = getTitle(content);
    let navLevel = [l1, l2];
    let retNavs: any = [];
    let toAppendNavList;

    navLevel.forEach(level => {
        toAppendNavList = find(navs, {
            level: level,
        });

        if (retNavs.length === 0) {
            retNavs = retNavs.concat(toAppendNavList);
        } else {
            toAppendNavList.forEach(item => {
                item = Object.assign(item);
                let parentNavIndex = getParentIndex(navs, item.index);
                return appendToParentNav(retNavs, parentNavIndex, item);
            });
        }
    });
    return retNavs;
}

const getTitle = (content: string) => {
    let nav = [];
    let tempArr: any[] = [];
    content.replace(/(#+)[^#][^\n]*?(?:\n)/g, (match: string, m1: any): string => {
        let title = match.replace("\n", "");
        let level = m1.length;
        tempArr.push({
            title: title.replace(/^#+/, "").replace(/\([^)]*?\)/, ""),
            level: level,
            children: [],
        });
        return '';
    });

    nav = tempArr.filter(item => item.level >= 2 && item.level <= 4);
    let index = 0;
    return (nav = nav.map(item => {
        item.index = index++;
        return item;
    }));
}

const find = (arr: any[], condition: any) => {
    return arr.filter(item => {
        for (let key in condition) {
            if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
                return false;
            }
        }
        return true;
    });
}

const getParentIndex = (nav: any[], endIndex: number) => {
    for (let i = endIndex - 1; i >= 0; i--) {
        if (nav[endIndex].level > nav[i].level) {
            return nav[i].index;
        }
    }
}

const appendToParentNav = (nav: any[], parentIndex: number, newNav: any[]) => {
    let index = findIndex(nav, {
        index: parentIndex
    });
    nav[index].children = nav[index].children.concat(newNav);
}

const findIndex = (arr: any[], condition: any) => {
    let ret = -1;
    arr.forEach((item, index) => {
        for (let key in condition) {
            if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
                return false;
            }
        }
        ret = index;
    });
    return ret;
}

export default handleNavTree;