// export interface Welcome {
//   count: number;
//   data:  Datum[];
// }

// export interface Datum {
//   date_and_time: Date;
//   garages: Garages;
// }

// export interface Garages {
//   A:     A;
//   B:     A;
//   C:     A;
//   D:     A;
//   H:     A;
//   I:     A;
//   Libra: A;
// }

// export interface A {
//   max_spaces: number;
//   percent_full: number;
//   spaces_filled: number;
//   spaces_left: number;
// }


// export interface Welcome {
//   count: number;
//   data: {
//     date_and_time: Date;
//     garages: {
//       A: {
//         max_spaces:    number;
//         percent_full:  number;
//         spaces_filled: number;
//         spaces_left:   number;
//       }
//       B: {
//         max_spaces:    number;
//         percent_full:  number;
//         spaces_filled: number;
//         spaces_left:   number;
//       }
//       C: {
//         max_spaces:    number;
//         percent_full:  number;
//         spaces_filled: number;
//         spaces_left:   number;
//       }
//       D: {
//         max_spaces:    number;
//         percent_full:  number;
//         spaces_filled: number;
//         spaces_left:   number;
//       }
//       H: {
//         max_spaces:    number;
//         percent_full:  number;
//         spaces_filled: number;
//         spaces_left:   number;
//       }
//       I: {
//         max_spaces:    number;
//         percent_full:  number;
//         spaces_filled: number;
//         spaces_left:   number;
//       }
//       Libra: {
//         max_spaces:    number;
//         percent_full:  number;
//         spaces_filled: number;
//         spaces_left:   number;
//       }
//     };
//   };
// }

// export interface Welcome {
//   count: number;
//   data: {
//     date_and_time: Date;
//     garages: {
//      [key: string]: number;
//   };
//   }[]
//   }

export interface Welcome {
  count: number;
  data: any[]
}
