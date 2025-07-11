import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Fruit } from '../../../shared/types/fruit.type';
import { Empty } from 'antd';
import { generateColorByIndex } from '../../../shared/utils/generate-color-by-index.ts';

type Props = {
  jar: Fruit[];
};

type LegendDatum = {
  value: string | number | undefined;
  color?: string;
  payload?: Fruit;
};

type LegendRenderProps = {
  payload?: readonly LegendDatum[];
};

export default function JarPieView({ jar }: Props): JSX.Element {
  return jar.length ? (
    <ResponsiveContainer width="100%" height={520}>
      <PieChart>
        <Pie
          data={jar}
          dataKey={(fruit: Fruit) => fruit.nutritions.calories}
          nameKey="name"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
          innerRadius={80}
        >
          {jar.map((_, index) => (
            <Cell key={index} fill={generateColorByIndex(index)} />
          ))}
        </Pie>
        <Legend
          content={(props) => <ScrollLegend payload={props.payload as readonly LegendDatum[]} />}
        />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <EmptyPie />
  );
}

function EmptyPie() {
  return (
    <div className="ant-list ant-list-split ant-list-bordered css-dev-only-do-not-override-12z5x5z">
      <div className="ant-list-empty-text">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    </div>
  );
}

const ScrollLegend: React.FC<LegendRenderProps> = ({ payload }) => (
  <div
    style={{
      maxHeight: 220,
      overflowY: 'auto',
      paddingLeft: 12,
      marginTop: 12,
      lineHeight: 1.3,
    }}
  >
    {payload?.map((entry) => (
      <div key={entry.value} style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            width: 10,
            height: 10,
            background: entry.color,
            borderRadius: 2,
            marginRight: 8,
          }}
        />
        <span style={{ fontSize: 12 }}>
          {entry.value} ({(entry.payload as Fruit).nutritions.calories})
        </span>
      </div>
    ))}
  </div>
);
