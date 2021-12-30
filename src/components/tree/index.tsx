import React from 'react'

import IArtist from '../../interfaces/artist'
import Card from '../card'
import ITreeProps from './type'

const TreeNode = (props: ITreeProps<IArtist>) => {
    const { data, is_loading, onPathChange } = props
    const minWidth = 216
    const width = (data.children?.length ?? 0) * minWidth
    return (
        <div
            className={`tree__node ${data.children ? 'with-children' : ''}`}
            style={{ width, minWidth }}
        >
            <Card data={data} />
            {data.children && (
                <div className="tree__node-children">
                    {data.children.map(c => {
                        return (
                            <TreeNode
                                key={`${c.id}-${data.id}`}
                                data={c}
                                is_loading={is_loading}
                                onPathChange={onPathChange}
                            />
                        )
                    })}
                </div>
            )}
            {(!data.children || data.children.length === 0) && (
                <div
                    className={`tree__node-button ${
                        is_loading ? 'disabled' : ''
                    }`}
                    onClick={() => {
                        onPathChange(data.path ?? [])
                    }}
                >
                    {is_loading ? 'Processing...' : 'Expand'}
                </div>
            )}
        </div>
    )
}

const TreeComponent = (props: ITreeProps<IArtist>) => {
    return (
        <div
            className={`tree ${
                !props.data.children || props.data.children.length === 0
                    ? 'initial'
                    : ''
            }`}
        >
            <TreeNode {...props} />
        </div>
    )
}

export default TreeComponent
