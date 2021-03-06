import React from 'react';
import {addDays} from 'date-fns';
import {Carousel, CarouselItem} from '@sberdevices/plasma-ui';
import {Button} from '@sberdevices/plasma-ui';

import {formatWeekDay} from '@/utils/format';
import {getWeekStartDate} from '@/utils/dates/getWeekStartDate';

import css from './style.css';
import {observer} from 'mobx-react-lite';
import {useEnhance} from './useEnhance';
import {fixWeekDay} from '@/utils/dates/fixDate';
import {WEEK_DAY} from '@/constants/date';

export type DayItemProps = {
    date: Date;
    isSelected: boolean;

    onChoose: (ind: Date) => void;
};

const DayItem = ({date, isSelected, onChoose}: DayItemProps) => {
    const handleClick = () => onChoose(date);

    return (
        <Button className={css.dayButton} onClick={handleClick} size="s" view={isSelected ? 'primary' : 'secondary'}>
            {formatWeekDay(date)}
        </Button>
    );
};

export type DaysCarouselBaseProps = {
    currentDay: Date;
    onDayChange: (dayNum: Date) => void;
};

export const DaysCarouselBase = ({currentDay, onDayChange}: DaysCarouselBaseProps) => {
    const currentDayIndex = fixWeekDay(currentDay.getDay());
    const firstWeekDay = getWeekStartDate(currentDay);

    return (
        <Carousel paddingEnd="12px" paddingStart="12px" className={css.carousel} axis="x" index={currentDayIndex}>
            {Array.from({length: currentDayIndex === WEEK_DAY.SUN ? 7 : 6}).map((_, ind) => (
                <CarouselItem className={css.dayItem} key={ind}>
                    <DayItem
                        isSelected={currentDayIndex === ind}
                        date={addDays(firstWeekDay, ind)}
                        onChoose={onDayChange}
                    />
                </CarouselItem>
            ))}
        </Carousel>
    );
};

export type DaysCarouselProps = {
    onDayChange: (date: Date) => void;
};

export const DaysCarousel = observer((props: DaysCarouselProps) => {
    const enhanced = useEnhance(props);

    return <DaysCarouselBase {...enhanced} />;
});
