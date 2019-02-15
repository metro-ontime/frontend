import pandas as pd
import json

stop_index = {}
position_index = {}

for direction in range(2):
    for line in range(801, 807):
        path = f"./static/line_info/{line}/{line}_{direction}_stations.csv"
        df = pd.read_csv(path, index_col=0)
        filtered = df[["stop_id", "relative_position", "stop_name"]]
        byStops = filtered.set_index("stop_id")
        byStops = json.loads(byStops.to_json(orient="index"))
        stop_index[f"{line}_{direction}"] = byStops

        byPosition = filtered.set_index("relative_position")
        byPosition = json.loads(byPosition.to_json(orient="index"))
        position_index[f"{line}_{direction}"] = byPosition

with open("StopPositions.json", "w") as outfile:
    json.dump(stop_index, outfile)
with open("PositionStops.json", "w") as outfile:
    json.dump(position_index, outfile)
