import { Table, Button, Badge } from 'antd';
import { Fruit } from '../../../shared/types/fruit.type';
import { calculateCalories } from '../../../shared/utils/calculate-calories';

type Props = {
  fruitData: Record<string, Fruit[]>;
  onAdd: (fruit: Fruit) => void;
  onAddAll: (fruits: Fruit[]) => void;
  className?: string;
};

/* TODO it will be better if split logic for table collapse rows  */
interface FruitRow extends Fruit {
  key: string;
  calories: number;
  action: JSX.Element;
  isGroup: false;
}

interface GroupRow {
  key: string;
  isGroup: true;
  name: string;
  calories: number;
  action: JSX.Element;
  children: FruitRow[];
}

type RowData = GroupRow | FruitRow;

const buildRows = (
  data: Record<string, Fruit[]>,
  addSingle: (fruit: Fruit) => void,
  addBulk: (fruits: Fruit[]) => void,
): RowData[] =>
  Object.entries(data).map<GroupRow>(([groupName, fruits]) => ({
    key: groupName,
    isGroup: true,
    name: groupName,
    calories: calculateCalories(fruits),
    action: (
      <Button size="small" type="primary" onClick={() => addBulk(fruits)}>
        Add&nbsp;All
      </Button>
    ),
    children: fruits.map<FruitRow>((fruit) => ({
      ...fruit,
      key: `fruit-${fruit.id}`,
      isGroup: false,
      calories: fruit.nutritions.calories,
      action: (
        <Button size="small" type="primary" onClick={() => addSingle(fruit)}>
          Add
        </Button>
      ),
    })),
  }));

const columns = [
  {
    title: 'Name / Group',
    dataIndex: 'name',
    render: (_: unknown, record: RowData) =>
      record.isGroup ? <strong>{record.name}</strong> : record.name,
  },
  {
    title: 'Family',
    dataIndex: 'family',
    render: (family: string | undefined, record: RowData) => (record.isGroup ? '' : family),
  },
  {
    title: 'Order',
    dataIndex: 'order',
    render: (order: string | undefined, record: RowData) => (record.isGroup ? '' : order),
  },
  {
    title: 'Genus',
    dataIndex: 'genus',
    render: (genus: string | undefined, record: RowData) => (record.isGroup ? '' : genus),
  },
  {
    title: 'Calories',
    dataIndex: 'calories',
    render: (cal: number, record: RowData) =>
      record.isGroup ? <Badge color="#10AD65" text={`${cal} cal`} /> : `${cal}`,
  },
  { title: '', dataIndex: 'action', width: 90 },
];

/* ──────────── component ─────────── */

export default function FruitTableView({ className, fruitData, onAdd, onAddAll }: Props) {
  return (
    <Table<RowData>
      className={className}
      size="small"
      pagination={false}
      scroll={{ x: true }}
      expandable={{ defaultExpandAllRows: false }}
      columns={columns}
      dataSource={buildRows(fruitData, onAdd, onAddAll)}
    />
  );
}
