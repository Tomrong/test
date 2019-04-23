import styled from 'styled-components'
import { media } from 'styled-bootstrap-grid'

const Main = styled.div`
position:relative;
margin:3rem auto;
table{ 
    margin:1rem auto;
    td{
        text-align:center;
    }
}
input[type=checkbox] {
    transform: scale(1.5);
  }
.table-responsive{
    padding-top:3rem;
}
.left{
    position: absolute;
    left: 0;
  
}
.right{
    position: absolute;
    right: 0;
    ${media.xs`
        right: 10;
    `}
}
.fix-position{
    float:left;
    margin-left:10px;
}
`

export default Main