import React, { useEffect } from 'react';
import { ACTIVITIES } from "../../utils/Dictionaries";

interface ActivitySelectionProps {
    selectedActivity: string;
    setSelectedActivity: (activity: string) => void;
}

const ActivitySelection: React.FC<ActivitySelectionProps> = ({selectedActivity, setSelectedActivity}) => {
    // Add console log to debug when props change
    return (
        <div className="my-4 text-center">
        <h3 className="text-2xl">Activity</h3>
        <div className="flex gap-12 text-2xl" >
            {ACTIVITIES.map((activity) => (
                <div key={activity} className="activity-option">
                    <input
                        type="radio"
                        name="activity"
                        className="form-radio text-blue-500 h-5"
                        value={activity}
                        id={activity}
                        checked={selectedActivity === activity}
                        onChange={e => setSelectedActivity(e.target.value)}
                    />
                    <label htmlFor={activity}>{activity}</label>
                </div>
            ))}
        </div>
        </div>
    );
}

export default ActivitySelection;