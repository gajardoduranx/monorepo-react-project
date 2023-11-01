import { FILTER_BUTTONS } from "../consts"
import { FilterValue } from "./types"

// https://dev.to/ivanzm123/dont-use-enums-in-typescript-they-are-very-dangerous-57bh
interface Props {
    filterSelected: FilterValue
    onFilterChange: (filter: FilterValue) => void
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
    return (
        <ul className="filters">
            {
                Object.entries(FILTER_BUTTONS).map(([key, { href, literal }]) => {
                    const isSelected = filterSelected === key
                    const className = isSelected ? 'selected' : ''
                    return (
                        <li key={key}>
                            <a
                                href={href}
                                className={className}
                                onClick={event => {
                                    event.preventDefault()
                                    onFilterChange(key as FilterValue)
                                }}>
                                {literal}
                            </a>
                        </li>
                    )
                }
                
                )
            }
        </ul>
    )
}
