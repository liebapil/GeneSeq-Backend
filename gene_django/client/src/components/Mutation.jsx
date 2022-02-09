import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import MutationRender from './MutationRender';

export default function Mutation(props) {
  //get seq
  const [gene, setGene] = useState({})
  const [geneName, setGeneName] = useState(gene.gene_name)
  const [sequencesOne, setSequencesOne] = useState(gene.sequence_one)
  const [sequencesTwo, setSequencesTwo] = useState(gene.sequence_two)
  const { id } = useParams()

  //get mutation 
  const [mutation, setMutation] = useState('no mutation')
  const [polar, setPolar] = useState('no polar')
  const [protonates, setProtonates] = useState('no protonate')
  const [submit, setSubmit] = useState(false);
  const [getmutation, setGetMutation]=useState([])


  const getGene = async (e) => {
    
    const res = await axios.get(`http://localhost:8000/gene/${id}`)
    setGene(res.data)
    setGeneName(res.data.gene_name)
    setSequencesOne(res.data.sequence_one)
    setSequencesTwo(res.data.sequence_two)

  }
  useEffect(() => {
    getGene()
    renderMut()
  }, [])

  /////mutation
  const postMutation = async (e) => {
    e.preventDefault()
    const res = await axios.post(`http://localhost:8000/mutation/`, {
      mutation: mutation,
      hphob_hphil: polar,
      protonate: protonates,
      gene_id: id
    })
    console.log(e)
  }

  const renderMut = async() =>{
    const res = await axios.get(`http://localhost:8000/mutation/`)
    setGetMutation(res.data)
  }


  return (
    <div>
      <p>Gene name: {gene.gene_name}</p>
      <p>Sequence one: {gene.sequence_one} </p>
      <p>Sequence Two: {gene.sequence_two}</p>
      <div>
        <form onSubmit={postMutation}>
          <input
            name='mutation'
            type='text'
            placeholder='mutation'
            onChange={(e) => {
              setMutation(e.target.value)
            }}
          />
          <input
            name='polar'
            type='text'
            placeholder='polar'
            onChange={(e) => {
              setPolar(e.target.value)
            }}
          />
          <input
            name='protonate'
            type='text'
            placeholder='protonate'
            onChange={(e) => {
              setProtonates(e.target.value)
            }}
          />
          <input className="submit-mutation" type="submit" />
        </form>
      </div>
      <div>
      {getmutation.map((props, idx)=>{
        if (props.gene_id === parseInt(id)){
          return (<MutationRender
          key={idx}
          mutation={props.mutation}
          hphob_hphil={props.hphob_hphil}
          protonate={props.protonate}
          
          />)}
        })}
      </div>
    </div>)
}
