import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
   
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdpater = new NodemailerMailAdapter();

    const submitFeedbacksUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdpater
    );

    await submitFeedbacksUseCase.execute({
        type,
        comment,
        screenshot
    })
  
    return res.status(201).send();
  })