import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Meta } from '../layout/Meta'
import { Section } from '../layout/Section'
import { actionCreators } from '../redux'
import { Charts } from '../template/Charts'
import { Shell } from '../template/Shell'
import { Stats } from '../template/Stats'
import { AppConfig } from '../utils/AppConfig'
// import { Welcome } from '../types';
// import { NextPage } from 'next';

// interface Props {
// graphData: Welcome
// error: any
// lastRowData: {
//   total_data_rows: number
//   last_date_and_time: Date
// }
// }

// const Index: NextPage<Welcome> = (graphData) => {
const Index = () => {
  // const Index = ({ lastRowData, error }: Props) => {
  const dispatch = useDispatch()
  const { HandleLastRowData } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    //   if (!error) {
    HandleLastRowData()
    // HandleLastRowData(lastRowData)
    //   }
  }, [])
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="UCF Parking">
        <Section>
          <Stats />
        </Section>

        <Section>
          <Charts />
        </Section>
      </Shell>
    </>
  )
}

export default Index

// export const getStaticProps = async () => {
//   try {
//     // const res = await fetch("https://api.ucfparking.com");
//     // const graphData = await res.json();
//     const res1 = await fetch('https://api.ucfparking.com/stats')
//     const lastRowData = await res1

//     return {
//       props: {
//         // graphData,
//         lastRowData: JSON.parse(JSON.stringify(lastRowData))
//       }
//     }
//   } catch (error) {
//     return {
//       props: {
//         error
//       }
//     }
//   }
// }
