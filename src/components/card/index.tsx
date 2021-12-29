import React from 'react'

import IArtist from '../../interfaces/artist'
import ICardProps from './type'

const Card = (props: ICardProps<IArtist>) => {
    const { data } = props
    return (
        <div className="card">
            <img src={data.images[0].url} />
            <div className="card__metadata">
                <div className="card__metadata-analytic">
                    <div className="card__metadata-analytic-item">
                        <span>
                            {new Intl.NumberFormat().format(data.popularity)}
                        </span>
                        <label>Popularity </label>
                    </div>
                    <div className="card__metadata-analytic-item">
                        <span>
                            {new Intl.NumberFormat().format(
                                data.followers.total,
                            )}
                        </span>
                        <label>Followers </label>
                    </div>
                </div>
                <div className="card__metadata-name">{data.name}</div>
            </div>
        </div>
    )
}

export default Card
