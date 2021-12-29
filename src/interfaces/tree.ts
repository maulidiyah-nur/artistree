type Tree<T> = T & {
    id: string
    name: string
    path?: Array<string>
    children?: Array<Tree<T>>
}

const updateSinglePath = <T>(
    tree: Tree<T>,
    id: string,
    nodes: Array<Tree<T>>,
) => {
    const result = tree
    if (result.id === id) {
        if (!result.children) {
            result.children = nodes.map(n => {
                const { id } = n as unknown as { id: string }
                return { ...n, path: [...(tree.path ?? []), id] }
            })
        }
    } else {
        result.children = result.children?.map(c => {
            const children = updateSinglePath({ ...c } as Tree<T>, id, nodes)
            return children
        })
    }
    return result
}

export const updateNodeInTree = <T>(
    tree: Tree<T>,
    paths: Array<string>,
    nodes: Array<Tree<T>>,
) => {
    let res = tree
    paths.forEach(p => {
        res = updateSinglePath(res, p, nodes)
    })
    return res
}

export default Tree
