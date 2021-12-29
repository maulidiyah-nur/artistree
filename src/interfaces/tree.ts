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
    level: number,
) => {
    const result = tree
    console.log(result.path?.length, level)
    if (result.id === id && result.path?.length === level + 1) {
        if (!result.children) {
            result.children = nodes.map(n => {
                const { id } = n as unknown as { id: string }
                return { ...n, path: [...(tree.path ?? []), id] }
            })
        }
    } else {
        result.children = result.children?.map(c => {
            const children = updateSinglePath(
                { ...c } as Tree<T>,
                id,
                nodes,
                level,
            )
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
    paths.forEach((p, i) => {
        res = updateSinglePath(res, p, nodes, i)
    })
    return res
}

export default Tree
