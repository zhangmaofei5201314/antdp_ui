//获取树形选的节点，官方的方法改装了一下
const getTreeNode = (treeData: object[], values: object[]) => {
    const valueMap = {};
    function loops(list: object[], parent: any) {
        return (list || []).map(({ children, value }: any) => {
            const node = (valueMap[value] = {
                parent,
                value
            });
            node.children = loops(children, node);
            return node;
        });
    }

    loops(treeData, '');

    function getPath(value: string) {
        const path = [];
        let current = valueMap[value];
        while (current) {
            path.unshift(current.value);
            current = current.parent;
        }
        return path;
    }

    let allEle: string[] = [];
    //treeCheckStrictly: true,//断绝父子关系，并且强制 labelInValue 为 true
    //数据格式会变成 [{value: "0-0", label: "Node1"}],需解构拿value
    values.map(({ value }: any) => {
        let a = getPath(value);
        // console.log(value,a);
        allEle.push(...a)
    })
    //去重
    allEle = Array.from(new Set(allEle))

    return allEle;
}

const roleDataTypeToSelect = (values: {}[]) => {
    const returnList: {}[] = [];
    if(Array.isArray(values)){
        values.map(({ code, codename }: any) => {
            const node = { value: code, label: codename }
            returnList.push(node);
        })
    } 
    return returnList;
}
export default {getTreeNode,roleDataTypeToSelect}