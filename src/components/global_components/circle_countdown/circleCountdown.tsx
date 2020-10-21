import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

type ArcData = {
    endAngle: number,
    outerRadius: number,
}

type Props = {
    color: string,
    radius: number,
    innerRadius: number,
    zoomFactor: number,
    period: number,
    periodStart: number,
    spikiness: number,
    time: number,
}

const CircleCountdown = (props: Props) => {
    const pathRef = useRef<SVGPathElement>(null)
    const arcRef = useRef<d3.Selection<SVGPathElement | null, ArcData, null, undefined> | null>(null)

    const arc = d3.arc<any, ArcData>()
        .startAngle(0)
        .innerRadius(props.innerRadius)

    useEffect(() => {
        arcRef.current = d3.select(pathRef.current)
            .datum({ endAngle: 0, outerRadius: props.radius })
            .attr('d', arc)

        return () => {
            d3.select(pathRef.current).remove()
        }
    }, [])

    useEffect(() => {
        arcRef.current!.transition()
            .ease(d3.easeLinear)
            .duration(props.time * 1000)
            .attrTween('d', data => {
                const interpolate = d3.interpolate(0, 2 * Math.PI)
                return t => {
                    data.endAngle = interpolate(t)
                    // Magic. Don't touch.
                    const period = props.period
                    const timeLeft = (1 - t) * props.time
                    const spikiness = props.spikiness
                    if (timeLeft <= props.periodStart + period / 2) {
                        data.outerRadius = (
                            1 + Math.pow(
                                Math.E,
                                Math.abs(
                                    spikiness * (
                                        (timeLeft % period) - period / 2
                                    )
                                ) - spikiness * period / 2
                            ) * props.zoomFactor
                        ) * props.radius
                    }
                    // End of magic. Keep working.
                    else {
                        data.outerRadius = props.radius
                    }
                    
                    return arc(data)!
                }
            })
    }, [])

    const radius = props.radius * (1 + props.zoomFactor)

    return (
        <svg width={radius * 2} height={radius * 2}>
            <g transform={`translate(${radius}, ${radius})`}>
                <path ref={pathRef} fill={props.color} />
            </g>
        </svg>
    )
}

CircleCountdown.defaultProps = {
    radius: 50,
    innerRadius: 0,
    zoomFactor: .2,
    period: 1,
    periodStart: 10,
    spikiness: 15,
}

export default CircleCountdown