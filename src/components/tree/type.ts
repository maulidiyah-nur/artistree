import Tree from '../../interfaces/tree'

interface ITreeProps<T> {
    data: Tree<T>
    is_loading: boolean
    onPathChange: (path: Array<string>) => void
}

export default ITreeProps
