type Tree<T> = T & {
    path?: Array<string>
    children?: Array<T>
}

export default Tree
