import { PureComponent } from 'react';
import { PieChart, Pie, Cell, Label } from 'recharts';

interface CardMetaProps {
  firstValuePercentage?: number;
  azulPadrao?: string;
  cinzaClaro?: string;  
  paginaAtual: number;
  paginaFinal: number;
}

export default class CardMeta extends PureComponent<CardMetaProps> {
  static defaultProps: CardMetaProps = {
    firstValuePercentage: 50,
    azulPadrao: "#1D5FA3",
    cinzaClaro: "#D3D3D3",      
    paginaAtual: 0,
    paginaFinal: 0
  };

  static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

  render() {
    const { paginaAtual, paginaFinal, azulPadrao, cinzaClaro } = this.props;

    const firstValuePercentage = (paginaAtual / paginaFinal) * 100;
    const secondValuePercentage = 100 - firstValuePercentage;

    const data = [
      { name: 'First Value', value: firstValuePercentage },
      { name: 'Second Value', value: secondValuePercentage },
    ];

    const COLORS = [azulPadrao, cinzaClaro];
    

    return (
      <PieChart width={140} height={140}>
        <Pie
          data={data}
          cx={65}
          cy={65}
          innerRadius={40}
          outerRadius={65}
          fill="#8884d8"
          startAngle={450}
          endAngle={90}
          dataKey="value"
          strokeWidth={2}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
          <Label
            value={`${paginaAtual}/${paginaFinal}`}
            position="center"
            fill={azulPadrao}
            style={{ fontSize: '16px' }}
          />
        </Pie>
      </PieChart>
    );
  }
}